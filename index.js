module.exports = function merge(first, second) {
    if (!first || !second) throw 'first and second cannot be null or undefined';
    if (first.constructor != second.constructor) throw 'Object type mismatch';
    
    const merged = JSON.parse(JSON.stringify(first));

    switch (second.constructor) {
        case Array:
            second.forEach(step);
            break;
        case Object:
            Object.entries(second).forEach(([k, value]) => step(value, k));
            break;
        default: throw 'Can only merge Objects or Arrays';
    }
    
    function step(value, k) {
        const existing = merged[k];
        if (
            existing
            && value
            && value.constructor == existing.constructor
            && (value.constructor == Object || value.constructor == Array)
        ) {
            merged[k] = merge(existing, value);
        } else {
            merged[k] = value;
        }
    }

    return merged;
}
