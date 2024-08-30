const logMiddleware = ( req, res, next ) => {
    const start = Date.now();

    res.on('finish', () => {
        const requestDuration = Date.now() - start;
        console.log(`Method: ${req.method} \nURL: ${req.url} \nDuration: ${requestDuration} ms`);
    });

    next();

};

export default logMiddleware;