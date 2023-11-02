import Func = jest.Func;

const abortController = async (fn: Function): Promise<void> => {
    let isMounted = true;
    const controller = new AbortController();

    try {
        fn();
        isMounted = false;
        controller.abort();
    } catch (err) {
        console.log('Error aborting!');
    }
};
