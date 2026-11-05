import json,sys
from playwright.sync_api import sync_playwright
U="http://127.0.0.1:5055/"
def run_lesson(pg):
    for _ in range(200):
        if pg.query_selector('#fin'): pg.click('#fin'); return True
        if pg.query_selector('#cont'): pg.click('#cont'); continue
        if pg.query_selector('#next'): pg.click('#next'); continue
        s=pg.evaluate('({t:cur.s.t,a:cur.s.a,n:(cur.s.tiles||[]).length})')
        if s['t'] in('mc','fill'): pg.click('.opt[data-o="%d"]'%s['a']); pg.click('#check')
        elif s['t']=='tf': pg.click('.opt[data-o="%d"]'%(1 if s['a'] else 0)); pg.click('#check')
        elif s['t']=='order':
            for i in range(s['n']):
                k=pg.evaluate('cur.tiles.findIndex((t,j)=>t.w===cur.s.tiles[%d]&&!cur.ans.includes(j))'%i); pg.click('#bank .tile[data-t="%d"]'%k)
            pg.click('#check')
        elif s['t']=='match':
            n=pg.evaluate('cur.s.pairs.length')
            for i in range(n): pg.click('.mt[data-side="L"][data-i="%d"]'%i); pg.click('.mt[data-side="R"][data-i="%d"]'%i)
    return False
res={}
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={'width':390,'height':844});pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(U);pg.wait_for_timeout(2500);pg.screenshot(path='test/s1-signin.png')
    res['signin_screen']=bool(pg.query_selector('#authF'))
    pg.click('[data-am="up"]');pg.fill('#aname','Moshe');pg.fill('#aemail','moshe@test.com');pg.fill('#apw','pw1234');pg.click('#ago');pg.wait_for_timeout(3500)
    res['signup_page']=bool(pg.query_selector('.signup #wname'));res['name_prefilled']=pg.input_value('#wname') if res['signup_page'] else None
    pg.screenshot(path='test/s2-profile.png')
    pg.click('#wprof [data-v="m"]');pg.click('#wsubj [data-v="mishnayos"]');pg.click('#wgo');pg.wait_for_timeout(4500)
    res['home']=pg.evaluate('tab');pg.screenshot(path='test/s3-home.png')
    pg.evaluate('openNode(0,0)');pg.wait_for_timeout(300);res['lesson_done']=run_lesson(pg);pg.wait_for_timeout(1500)
    xp=pg.evaluate('S.xp');res['xp_after_lesson']=xp
    res['saved_doc']=pg.evaluate('(()=>{const o=JSON.parse(localStorage.getItem("__fakefs")||"{}");return Object.keys(o)})()')
    # survive a reload and a wiped local copy
    pg.evaluate('localStorage.removeItem("limudpath.v2")');pg.reload();pg.wait_for_timeout(3500)
    res['after_reload']={'xp':pg.evaluate('S.xp'),'name':pg.evaluate('curP().name'),'auth':pg.evaluate('AUTH')}
    # learn together
    pg.evaluate('S.settings.name="Moshe";S.settings.together=true;ltJoin()');pg.wait_for_timeout(1500)
    res['lt_status']=pg.evaluate('LT.status');res['lt_presence']=[k for k in pg.evaluate('Object.keys(JSON.parse(localStorage.getItem("__fakefs")))') if k.startswith('rooms/')]
    # second person on the same phone
    pg.evaluate('settingsSheet()');pg.wait_for_timeout(300);pg.click('#sOut');pg.wait_for_timeout(3000)
    res['signed_out_screen']=bool(pg.query_selector('#authF'))
    pg.click('[data-am="up"]');pg.fill('#aname','Chaya');pg.fill('#aemail','chaya@test.com');pg.fill('#apw','pw1234');pg.click('#ago');pg.wait_for_timeout(3500)
    res['B_signup']=pg.input_value('#wname');pg.click('#wprof [data-v="f"]');pg.click('#wgo');pg.wait_for_timeout(4500)
    res['B']={'name':pg.evaluate('curP().name'),'xp':pg.evaluate('S.xp'),'profiles':pg.evaluate('Object.keys(ACC.profiles).length')}
    # B cannot read A's account
    res['B_reads_A']=pg.evaluate('''(async()=>{const db=await claude.use("db");const o=JSON.parse(localStorage.getItem("__fakefs"));const a=Object.keys(o).find(k=>k.startsWith("data/users/")&&!k.includes(LimudAuth.user.uid));const s=a.split("/");try{await db.collection(s.slice(0,3).join("/")).doc(s[3]).get();return "read!"}catch(e){return "denied"}})()''')
    # A signs back in: progress still there
    pg.evaluate('settingsSheet()');pg.wait_for_timeout(300);pg.click('#sOut');pg.wait_for_timeout(3000)
    pg.fill('#aemail','moshe@test.com');pg.fill('#apw','pw1234');pg.click('#ago');pg.wait_for_timeout(4000)
    res['A_again']={'name':pg.evaluate('curP().name'),'xp':pg.evaluate('S.xp')}
    pg.fill_value=None
    res['bad_password']=None
    pg.evaluate('settingsSheet()');pg.wait_for_timeout(300);pg.click('#sOut');pg.wait_for_timeout(3000)
    pg.fill('#aemail','moshe@test.com');pg.fill('#apw','wrong');pg.click('#ago');pg.wait_for_timeout(2000);res['bad_password']=pg.inner_text('#aerr')
    res['manifest']=pg.evaluate('fetch("manifest.webmanifest").then(r=>r.json()).then(j=>j.name)')
    res['errors']=errs
print(json.dumps(res,indent=1))
