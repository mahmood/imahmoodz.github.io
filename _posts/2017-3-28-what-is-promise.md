---
layout: post
title:  "Promise چیست؟"
date:   2017-03-28 22:00:15 +0430
jalali_date: "۸ اردیبهشت ۱۳۹۶"
permalink: /:title
categories: js es6
---

یکی از قابلیت های خوب ES6 آبجکت پرامیس و متد های کاربردی اون هست که توی عملیات async خیلی به ما کمک می‌کنه
API پرامیس تو جاوااسکریت از [Promise/A+](https://promisesaplus.com/) پیروی می‌کنه
پس بصورت کلی پرامیس یه مقداری رو نشون میده که ممکنه درحال حاظر وجود داشته باشه یا درآینده دردسترس قرار بگیره و یا اصلا قرار نگیره.

## چرا Promise 
بطور کلی پرامیس مشکل callback hell رو حل می‌کنه، احتمالا شما درگیر این مشکل بودید که برای انجام عملیاتی چندین callback تودرتو داشتید و همه‌چی حسابی با هم قاطی شدن

کد زیر نمونه یک callback hell هستش 😱

{% highlight js %}
fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          widths.forEach(function (width, widthIndex) {
            height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})
{% endhighlight %}
پرامیس به ما کمک می‌کنه که عملیات async رو بصورت درست سازمان‌دهی کنیم.

پرامیس فقط توی جاوااسکریپت وجود داره؟ خب جواب خیره! قبل از جاوااسکریپت توی زبان های برنامه‌نویسی معروف دیگه‌‌ای مثل 
[جاوا](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Future.html)، [اسکالا](http://docs.scala-lang.org/overviews/core/futures.html)، [پایتون](https://pypi.python.org/pypi/promise) و [کلوجر](https://clojuredocs.org/clojure.core/future) پیاده سازی شده بوده.

## حالت های Promise
پرامیس سه تا حالت داره که در پایین بهشون اشاره می‌کنم

* pending: وضعیت اولیه پرامیس وقتی یک نمونه ازش میگیریم(instance)
* fullfiled: حالتی که پرامیس با موفیت انجام شده یا resolve شده
* rejected: وقتی هست که پرامیس فیل شده یا reject شده

## متد های Promise
{% highlight js %}
Promise.all([Promise1, Promise2, ...])
{% endhighlight %}
این متد آرایه‌ای از پرامیس هارو ورودی میگیره و یه پرامیس برمی‌گردونه وقتی که همه پرامیس هایی که ورودی بهش دادیم resolve بشن یا یکیشون reject بشه.
این متد برای وقتی خیلی خوبه که می‌خوایم نتایج چند پرامیس رو جمع‌آوری کنیم.

از اونجایی که استاد می‌فرمایند talk is cheap, show me the code بریم یکم کد ببینم تا بهتر بفهمیمش. 
{% highlight js %}
var p1 = Promise.resolve(3);
var p2 = 1376;
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
}); 

Promise.all([p1, p2, p3]).then(values => { 
  console.log(values); // [3, 1376, "foo"] 
});
{% endhighlight %}
----
{% highlight js %}
Promise.race([Promise1, Promise2, ...])
{% endhighlight %}
این متد هم دقیقا مثل متد بالاس اما یه فرق کوچیک داره که اسم این متد هم این رو میرسونه یجور باهم مسابقه دارن هرکدوم که زودتر resolve یا reject شه انجام میشه و از بقیه چشم‌پوشی می‌کنه. 🙃

{% highlight js %}
var p1 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 500, 'one'); 
});
var p2 = new Promise(function(resolve, reject) { 
    setTimeout(resolve, 100, 'two'); 
});

Promise.race([p1, p2]).then(function(value) {
  console.log(value); // "two"
  // Both resolve, but p2 is faster
});
{% endhighlight %}

----
{% highlight js %}
Promise.resolve(value)
Promise.reject(value)
Promise.catch()
{% endhighlight %}

 با این دوتا متد خیلی کار خواهیم داشت که مشخص هستن اولی یه پرامیس رو با مقداری که دادیم بهش resolve میکنه و ریجکت هم با مقدار ریجکت می‌کنه

 بخش catch هم وقتی پرامیس ریجکت شه اجرا میشه.

{% highlight js %}
let myPromise = (num) => {
    return new Promise((resolve, reject) => {
        if(num){
            resolve(num);
        }else{
            reject('Cant find number');
        }
    });
};

myPromise(2).then(msg => {
    //چون ۲ رو به عنوان ورودی دادیم این بخش اجرا میشه و ۲لاگ میشه
    console.log(msg);
}).catch(err => {
    //اجرا نخواهد شد مگر ورودی به پرامیس بدیم
    console.error('Error:',err);
});
{% endhighlight %}



برای مطالعه بیشتر میتونید به [این بخش](http://exploringjs.com/es6/ch_promises.html#sec_introduction-promises)   مراجعه کنید


حالا که با پرامیس آشنا شدیم زندگی برامون راحت تر میشه 😄





