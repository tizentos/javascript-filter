function one_order_butterworth_filter(Wn,signal_data){
    
    if (signal_data === null || signal_data.length === 0 || signal_data === undefined){
        throw Error('input can not be zero value');
    }

    var filter_data=iirFilter(Wn);


    var output_data=[];

    var xtmp,d0,m;
    var y_data=[];
    var md2;
    var b_y_data=[];
    var y_size=[];
    var b_y_size=[];
    var i;
    var c_y_size=[];

    xtmp=2.0 * signal_data[0];
    d0=2.0 * signal_data[signal_data.length -1];
    for (m=0; m<3; m++){
        y_data[m] = xtmp - signal_data[3-m]
    }

    md2=signal_data.length;
    for (m=0; m<md2; m++){
        y_data[m+3] = signal_data[m];
    }

    for (m=0; m<3; m++){
        y_data[(m+signal_data.length)+ 3]= d0 - signal_data[(signal_data.length-m)- 2];
    }

    y_size[0]= 6 +signal_data.length;
    md2 = 6 + signal_data.length;
    for (m=0; m< md2; m++){
        b_y_data[m]= y_data[m];
    }

    filter(filter_data.b,filter_data.a,b_y_data, y_size, filter_data.zi * y_data[0], y_data, b_y_size);
    m = b_y_size[0];
    md2 = b_y_size[0] >> 1;
    for (i = 1; i <= md2; i++) {
        xtmp = y_data[i - 1];
        y_data[i - 1] = y_data[m - i];
        y_data[m - i] = xtmp;
    }

    c_y_size[0] = b_y_size[0];
    md2 = b_y_size[0];
    for (m = 0; m < md2; m++) {
        b_y_data[m] = y_data[m];
    }

    filter(filter_data.b,filter_data.a,b_y_data, c_y_size, filter_data.zi * y_data[0], y_data, b_y_size);
    m = b_y_size[0];
    md2 = b_y_size[0] >> 1;
    for (i = 1; i <= md2; i++) {
        xtmp = y_data[i - 1];
        y_data[i - 1] = y_data[m - i];
        y_data[m - i] = xtmp;
    }

    md2 = signal_data.length;
    for (m = 0; m < md2; m++) {
        output_data[m] = y_data[3 + m];
    }
    return output_data;
}
function filter(b,a,x_data,x_size,zi,y_data,y_size){
    var dbuffer=[];
    var j,k;
    y_size[0] = x_size[0];
    dbuffer[1] = zi;
    for (j = 0; j + 1 <= x_size[0]; j++) {
        dbuffer[0] = dbuffer[1];
        dbuffer[1] = 0.0;
        for (k = 0; k < 2; k++) {
            dbuffer[k] += x_data[j] *b[0];
        }
        dbuffer[1] -= dbuffer[0] * a[1];
        y_data[j] = dbuffer[0];
    }
}

function iirFilter(Wn){
    var warped= 4 * Math.tan(Math.PI*Wn/2);
    var z=[];
    var p= -warped;
    var k= warped;

    var fs2=4.0;
    var z_z= -1.0;
    var p_z = (fs2 + p)/(fs2 - p);
    var k_z = k * 1/(4-p);


    //initial condition for digital filter
    zi_table= [0.9845337085968975, 0.9695312529087453, 0.9549649940888691, 0.9408092961815933, 0.927040342731733, 0.9136359729862373, 0.9005755352793756, 0.8878397555248064, 0.8754106190193822, 0.8632712640026808, 
         0.8514058856201788, 0.8397996491122632, 0.8284386112006398, 0.8173096487720745, 0.8064003940699659, 0.7956991756997357, 0.7851949648366474, 0.7748773260963852, 0.7647363725910077, 0.7547627247472146,
         0.7449474725112386, 0.7352821406061255, 0.7257586565434917, 0.7163693211237131, 0.7071067811865475, 0.6979640043988607, 0.6889342558879106, 0.680011076547878, 0.6711882628643413, 0.6624598481164531,
         0.6538200848299489, 0.6452634283659582, 0.6367845215411184, 0.6283781801838633, 0.6200393795400579, 0.6117632414485745, 0.6035450222139692, 0.5953801011092832, 0.5872639694471824, 0.5791922201622679,
         0.5711605378514713, 0.563164689223054, 0.5552005139079094, 0.5472639155896409, 0.5393508534123093, 0.5314573336268246, 0.52357940143874, 0.5157131330216754, 0.5078546276618322, 0.49999999999999983, 
         0.4921453723381674, 0.48428686697832424, 0.47642059856125957, 0.46854266637317493, 0.46064914658769046, 0.4527360844103588, 0.4447994860920903, 0.43683531077694565, 0.42883946214852836, 0.42080777983773165,
         0.41273603055281727, 0.4046198988907163, 0.3964549777860304, 0.3882367585514252, 0.3799606204599418, 0.3716218198161363, 0.36321547845888114, 0.3547365716340415, 0.34617991517005053, 0.3375401518835465, 
         0.32881173713565814, 0.3199889234521214, 0.3110657441120892, 0.3020359956011389, 0.2928932188134521, 0.2836306788762866, 0.27424134345650797, 0.26471785939387377, 0.25505252748876106, 0.24523727525278516, 
         0.23526362740899215, 0.22512267390361454, 0.214805035163352, 0.20430082430026394, 0.19359960593003345, 0.18269035122792543, 0.1715613887993597, 0.16020035088773624, 0.14859411437982067, 
         0.13672873599731894, 0.12458938098061689, 0.11216024447519272, 0.09942446472062372, 0.08636402701376139, 0.07295965726826596, 0.0591907038184045, 0.045035005911130466, 0.03046874709125285, 0.015466291403102506];

    zi_index=Math.floor(Wn/0.01);

    var zi= zi_index === 0 ? zi_table[0] : zi_table[zi_index-1];
    
    var b_a=zpk2tf(z_z,p_z,k_z);
    return {
        b: b_a.b,
        a: b_a.a,
        zi: zi
    };
}

function zpk2tf(z,p,k){

    var pj=[1.0 , -z];
    var i0;
    var a=[1.0, -p];
    var b=[];
    for (i0=0; i0< 2; i0++){
        b[i0] = pj[i0] * k;
    }
    return {b:b,a:a};
}