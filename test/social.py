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
    signup(pg,'Moshe','moshe@t.com','m')
    pg.evaluate('S.xp=640;town().items.push({k:"shul",x:1,y:1},{k:"road",x:2,y:1});save();socPublish()');pg.wait_for_timeout(800)
    signout(pg)
    signup(pg,'Dovid','dovid@t.com','m');pg.wait_for_timeout(800)
    pg.evaluate('communitySheet()');pg.wait_for_timeout(1500);pg.screenshot(path='test/soc1.png')
    res['B_sees']=pg.evaluate('socAll().map(p=>[p.card.nick,p.online,p.card.lv])')
    pg.click('.lrn >> nth=0');pg.wait_for_timeout(500);pg.screenshot(path='test/soc2.png')
    pg.click('#lf5');pg.wait_for_timeout(800);res['B_given']=pg.evaluate('S.counts.fivesGiven')
    pg.click('#ltown');pg.wait_for_timeout(600);pg.screenshot(path='test/soc3.png')
    res['town_svg']=pg.evaluate('!!document.querySelector(".lrn-town svg")')
    pg.evaluate('closeSheet();globeView()');pg.wait_for_timeout(1500);pg.screenshot(path='test/soc4.png');res['globe_people']=pg.evaluate('document.querySelectorAll(".gp").length')
    pg.evaluate('document.getElementById("gclose").click()')
    signout(pg)
    pg.fill('#aemail','moshe@t.com');pg.fill('#apw','pw1234');pg.click('#ago');pg.wait_for_timeout(4500)
    res['A_gotToast']=pg.evaluate('!!document.querySelector(".hitoast")');pg.screenshot(path='test/soc5.png')
    res['A_fivesGot']=pg.evaluate('(S.counts||{}).fivesGot')
    # a girl does not see the boys
    signout(pg);signup(pg,'Chaya','chaya@t.com','f');pg.wait_for_timeout(800)
    res['girl_sees']=pg.evaluate('(async()=>{await socLoad(true);return socAll().map(p=>p.card.nick)})()')
    res['errors']=errs
print(json.dumps(res,indent=1))
