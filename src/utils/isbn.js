export default class ISBN {
    static makeISBN() {
        let laendercode;
        let bandnr;
        let verlagsnr;
        let checksum;

        let L1 = Math.random()*(10);
        let L2 = Math.random()*(10);

        let B1 = Math.random()*(10);
        let B2 = Math.random()*(10);
        let B3 = Math.random()*(10);

        let V1 = Math.random()*(10);
        let V2 = Math.random()*(10);

        if(parseInt(L1) == 0 && parseInt(L2) == 0) {
            L2++;
        }
        if(parseInt(B1) == 0) {
            B1++;
        }
        if(parseInt(V1) == 0 && parseInt(V2) == 0) {
            V2++;
        }
        let C = (ISBN.hashOp(parseInt(L1)) +L2 + ISBN.hashOp(parseInt(B1)) +B2 + ISBN.hashOp(parseInt(B3)) +V1 + ISBN.hashOp(parseInt(V2)))%10;

        laendercode     = parseInt(L1)+""+parseInt(L2);
        bandnr          = parseInt(B1)+""+parseInt(B2)+""+parseInt(B3);
        verlagsnr       = parseInt(V1)+""+parseInt(V2);
        checksum        = parseInt(C)+"";

        return laendercode + "-" + bandnr + "-" + verlagsnr + "-" + checksum;
    }

    static hashOp(i)
    {
        i = parseInt(i);
        // used to determine C
        var doubled = 2 * i;
        if ( doubled >= 10 ) {
            doubled = doubled - 9;
        }
        return doubled;
    }
}