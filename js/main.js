$(document).ready(function () {

//    default Functions
    
//    scroll to top button start
    mybutton = document.getElementById("myBtn");
    window.onscroll = function () {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {  //button will be visible after scrolling 20px from top
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
//    scroll to top button end

//    finding factors for 1 mod fi(n)
    
    function findPrimeFactors(num) {

        var primeFactors = [];
        while (num % 2 === 0) {
            primeFactors.push(2);
            num = num / 2;
        }

        var sqrtNum = Math.sqrt(num);
        for (var i = 3; i <= sqrtNum; i++) {
            while (num % i === 0) {
                primeFactors.push(i);
                num = num / i;
            }
        }

        if (num > 2) {
            primeFactors.push(num);
        }
        return primeFactors;
    }
    
//    check if p & q are primes

    function test_prime(n) {

        if (n === 1) {
            return false;
        } else if (n === 2) {
            return true;
        } else {
            for (var x = 2; x < n; x++) {
                if (n % x === 0) {
                    return false;
                }
            }
            return true;
        }
    }
    
//    calculating encryption & decryption equations

    function powerMod(base, exponent, modulus) {
        if (modulus === 1) return 0;
        var result = 1;
        base = base % modulus;
        while (exponent > 0) {
            if (exponent % 2 === 1) //odd number
                result = (result * base) % modulus;
            exponent = exponent >> 1; //divide by 2
            base = (base * base) % modulus;
        }
        return result;
    }

//    special case to check if input field has all numeric values
    
    function allnumeric(inputtxt) {
        var numbers = /^[0-9](,[0-9])*$/;
        if (inputtxt.value.match(numbers)) {
            return true;
        } else {
            return false;
        }
    }

    const enc = [];
    const dec = [];
    
//    buttons on click functions

    $("#pqsubmit").click(function () {
        var p = $("#p").val(); //accepting p value
        var q = $("#q").val(); //accepting q value

        if (p == q) { //checking if p & q are same
            $("#p").css('color', 'red');
            $("#q").css('color', 'red');
        } else { 
            if (!test_prime(p)) { //checking if p is non-prime
                $("#p").val(p + " is not prime").css('color', 'red');
            }
            if (!test_prime(q)) { //checking if q is non-prime
                $("#q").val(q + " is not prime").css('color', 'red');
            }
            if (test_prime(p) && test_prime(q)) { //if both p & q are primes accepting them
                var n = p * q;
                var r = (p - 1) * (q - 1);

                const cand = [];
                var j = 1;
                for (var i = 0; i < 30; i++) { //creating candidates array for 1 mod fi(n)
                    var x = (r * j) + 1;
                    cand.push(x);
                    j++;
                }
                var msg = cand.join("   ");
                $("#p").css('color', 'greenyellow');
                $("#q").css('color', 'greenyellow');
                $("#n").val(n);
                $("#r").val(r);
                $("#cand").val(msg);
            }
        }
    });

//    taking the value of k for factoring
    
    $("#ksubmit").click(function () {
        var k = $("#k").val();
        const factor = findPrimeFactors(k); //factorizinng k into prime numbers
        var msg = factor.join("*");
        if (factor.length == 1) {
            $("#factork").val("is prime");
        } else {
            $("#factork").val(msg);
        }

    });
    
//    take the value of e & d and check if they are acceptable
    
    $("#edcheck").click(function () {
        var e = $("#e").val();
        var d = $("#d").val();
        var r = $("#r").val();
        var x = (e * d) % r;
        if (x == 1) {
            $("#ed").val("e & d are acceptable").css('color', 'greenyellow');
        } else {
            $("#ed").val("e & d are not acceptable").css('color', 'red');
        }

    });
    
//    take message from user and encrypt

    $("#encode").click(function () {
        var msg = $("#msg").val();
        var e = $("#e").val();
        var n = $("#n").val();

        for (var i = 0; i < msg.length; i++) {
            var x = msg.charCodeAt(i);
            var y = powerMod(x, e, n);
            enc.push(y);
        }
        var msg2 = String.fromCharCode(...enc);
        $("#encrypt").val(msg2);
        $("#encryptnum").val(enc);
        enc.length = 0;
    });

//    take encrypted message from user and decrypt
    
    $("#decode").click(function () {
        var msg = $("#cipher").val();
        var d = $("#d").val();
        var n = $("#n").val();
        var isNumber = /^[0-9,]*$/.test(msg);
        if (isNumber) {
            const binaryArray = msg
                .split(',').map(Number);
            for (var i = 0; i < binaryArray.length; i++) {
                var z = powerMod(binaryArray[i], d, n);
                dec.push(z);
            }
            var msg2 = String.fromCharCode(...dec);
            $("#decrypt").val(msg2);
            $("#decryptnum").val(dec);
            dec.length = 0;
        } else {
            for (var i = 0; i < msg.length; i++) {
                var x = msg.charCodeAt(i);
                var z = powerMod(x, d, n);
                dec.push(z);
            }
            var msg2 = String.fromCharCode(...dec);
            $("#decrypt").val(msg2);
            $("#decryptnum").val(dec);
            dec.length = 0;
        }
    });

});
