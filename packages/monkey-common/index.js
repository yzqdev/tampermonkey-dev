(function () {
    console.log(`%c华东数控莲富大厦`,`color:red;font-size:16px;background:transparent`)
    let selectHtml=`<div style="">
    <label>
    aaa <input oninput="show($event)" type="checkbox" value="aa" />
   bbb<input type="checkbox" value="aa" />
   ccc <input type="checkbox" value="aa" />
</label></div>
    ` ;document.documentElement.insertAdjacentHTML('beforeend', selectHtml); // 插入元素
    document.documentElement.style.overflow = document.body.style.overflow = 'hidden';
    GM_setValue("key", "value")
    console.log(`%c${GM_getValue('key', 'defaultValue')}`,`color:red;font-size:16px;background:transparent`)
    function show(event) {
        console.log(event)
        console.log('hhh')

    }
})()
