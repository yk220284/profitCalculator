var calButton = document.getElementById('calButton');
var forms = document.getElementsByClassName('needs-validation');
var display = [document.getElementById('result1'), document.getElementById('result2'), document.getElementById('result3'), document.getElementById('result4')];


calButton.addEventListener('click', function () {
    Array.prototype.filter.call(forms, function (form) {
        form.classList.add('was-validated');
        if (form.checkValidity()) {
            startCal(form)
        }
    });


});

function startCal(form) {
    console.log('all filled');
    var obj = {};
    for (var i = 0; i < (form.length - 2); ++i) {
        var element = form[i];
        var id = element.id;
        var value = parseFloat(element.value);
        obj[id] = value;
    }
    console.log(obj)

    ans1 = calculator(obj, 1);
    console.log(ans1)
    ans2 = calculator(obj, 1.25);
    ans3 = calculator(obj, 10 / 7);

    display[0].innerHTML = '需要达到0%的毛利润(不亏)，需要实收营业额：' + ans1.yye + '(相当于吊牌价大概：' + ans1.target + '这么多的货品)。 店员平均工资在： ' + ans1.lb + '到' + ans1.ub + '之间。 毛利润： ' + ans1.profit + ' 元。';
    display[1].innerHTML = '需要达到20%的毛利润，需要实收营业额：' + ans2.yye + '(相当于吊牌价大概：' + ans2.target + '这么多的货品)。 店员平均工资在： ' + ans2.lb + '到' + ans2.ub + '之间。 毛利润： ' + ans2.profit + ' 元。';
    display[2].innerHTML = '需要达到30%的毛利润，需要实收营业额：' + ans3.yye + '(相当于吊牌价大概：' + ans3.target + '这么多的货品)。 店员平均工资在： ' + ans3.lb + '到' + ans3.ub + '之间。 毛利润： ' + ans3.profit + ' 元。';
    if (obj.raw) {
        ans4 = calculator(obj, 1 / (1 - obj.raw / 100));
        display[3].innerHTML = '需要达到' + obj.raw + '%的毛利润，需要实收营业额：' + ans4.yye + '(相当于吊牌价大概：' + ans4.target + '这么多的货品)。 店员平均工资在： ' + ans4.lb + '到' + ans4.ub + '之间。 毛利润： ' + ans4.profit + ' 元。';
    }


}

function calculator(obj, alpha) {
    var ratio = obj.pjzk * 0.01 - ((obj.dg + obj.yl) * 0.01 * obj.pjzk * 0.01 + obj.nhzk * 0.01) * alpha;
    var fixed_cost = (obj.zj + obj.jcgz * obj.dnrs) * alpha;
    var target = fixed_cost / ratio;
    var yye = target * obj.pjzk * 0.01;
    var profit = yye * (1 - 0.01 * (obj.yl + obj.dg)) - target * obj.nhzk * 0.01 - obj.jcgz * obj.dnrs - obj.zj;
    var lb = (yye * (obj.dg * 0.01)) / obj.dnrs + obj.jcgz
    var ub = yye * ((obj.dg + obj.yl * 2 / 3) * 0.01) / obj.dnrs + obj.jcgz
    return {
        yye: Math.round(yye),
        target: Math.round(target),
        lb: Math.round(lb),
        ub: Math.round(ub),
        profit: Math.round(profit)
    };

}