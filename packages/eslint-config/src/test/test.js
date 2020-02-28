

export const func = async function(){

    // Needed for the webpack dynamic import to work correctly
    // eslint-disable-next-line no-inline-comments
    const test = await import(/* webpackChunkName: "test.js" */ "./test-import");

    console.log(test);

    return test;

};


export const xyz = 1;
