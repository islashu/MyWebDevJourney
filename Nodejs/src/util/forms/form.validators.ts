const isValidEmail = (v) => {
    let re = /^\d{10}$/;
    return !v || !v.trim().length || re.test(v);
};

module.exports = {isValidEmail};
