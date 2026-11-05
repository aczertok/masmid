import json
from playwright.sync_api import sync_playwright
U="http://127.0.0.1:5055/"
def signup(pg,name,email,g):
    pg.click('[data-am="up"]');pg.fill('#aname',name);pg.fill('#aemail',email);pg.fill('#apw','pw1234');pg.click('#ago');pg.wait_for_timeout(3500)
    pg.click('#wprof [data-v="%s"]'%g);pg.click('#wgo');pg.wait_for_timeout(4500)
def signout(pg):
    pg.evaluate('settingsSheet()');pg.wait_for_timeout(300);pg.click('#sOut');pg.wait_for_timeout(3000)
res={}
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(U);pg.wait_for_timeout(2500)
    for nm,em,unit in (('Moshe','m@t.com',8),('Yossi','y@t.com',20)):
        signup(pg,nm,em,'m')
        pg.evaluate(f'''(()=>{{S.course="chumash";setCourse("chumash");const U=CRS.units;for(let k=0;k<{unit};k++)U[k].nodes.forEach(n=>S.lessons[n.id]={{done:true,stars:3}});S.xp=900+{unit}*20;S.active=[today(),addDays(today(),-1),addDays(today(),-2)];save();render();socPublish()}})()''');pg.wait_for_timeout(1000)
        signout(pg)
    signup(pg,'Dovid','d@t.com','m');pg.wait_for_timeout(500)
    pg.evaluate('globeView()');pg.wait_for_timeout(1500);pg.screenshot(path='test/ln1.png')
    pg.click('.gchips [data-gc="2"]');pg.wait_for_timeout(2500)
    res['map_open']=pg.evaluate('MV!==null');res['course']=pg.evaluate('CRS.id')
    pg.wait_for_timeout(800);res['people_on_map']=pg.evaluate('document.querySelectorAll(".mpp").length');res['strip']=pg.inner_text('#mppl') if pg.query_selector('#mppl:not([hidden])') else None
    pg.screenshot(path='test/ln2.png')
    pg.evaluate('(()=>{const t=[...document.querySelectorAll(".mterr.live")][3];t.querySelector("path").dispatchEvent(new MouseEvent("click",{bubbles:true}))})()');pg.wait_for_timeout(1200);pg.screenshot(path='test/ln3.png')
    res['card_items']=pg.evaluate('document.querySelectorAll("#mcard [data-start]").length')
    pg.click('.mppl-p >> nth=0');pg.wait_for_timeout(700);pg.screenshot(path='test/ln4.png',full_page=False)
    res['acc']=pg.inner_text('.lrn-acc') if pg.query_selector('.lrn-acc') else None
    pg.click('#lback');pg.wait_for_timeout(1500);res['back_to_map']=pg.evaluate('MV!==null')
    res['errors']=errs
print(json.dumps(res,indent=1,ensure_ascii=False))
