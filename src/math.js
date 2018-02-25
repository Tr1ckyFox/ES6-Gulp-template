
class MATH {
    
    constructor(x,n) {
        this.x = x;
        this.n = n;
    }
    get PI() { 
        return 3.14 
    }
    sum(...args) { 
        let res = 0;
        for (let index = 0; index < args.length; index++) {
            res = res + args[index];
        }
        return res;
    }
    pow(x,n) {
        let res = 1;
        for (let i = 0; i < n; i++) {
            res = res * x;
        }
        return res;
    }
    abs(x) {
        return (x>0) ? x : (x == 0) ? x : -x;
    }
    divide(x,n) { return x / n; }
    subs(x,n) { return x - n }

}


export default MATH;