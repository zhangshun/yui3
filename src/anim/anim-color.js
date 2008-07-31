/**
 * Adds color behaviors to Anim.
 * @module anim
 * @submodule anim-color
 * @for Anim
 */

var NUM = Number;

Y.Anim.behaviors.color = {
    set: function(anim, att, from, to, elapsed, duration, fn) {
        from = Y.Color.re_RGB.exec(Y.Color.toRGB(from));
        to = Y.Color.re_RGB.exec(Y.Color.toRGB(to));


        if (!from || !to) {
            Y.fail('invalid from or to passed to color behavior');
        }

        anim._node.setStyle(att, 'rgb(' + [
            Math.floor(fn(elapsed, NUM(from[1]), NUM(to[1]) - NUM(from[1]), duration)),
            Math.floor(fn(elapsed, NUM(from[2]), NUM(to[2]) - NUM(from[2]), duration)),
            Math.floor(fn(elapsed, NUM(from[3]), NUM(to[3]) - NUM(from[3]), duration))
        ].join(', ') + ')');
    },
    
    // TODO: default bgcolor const
    get: function(anim, att) {
        var val = anim._node.getComputedStyle(att);
        val = (val === 'transparent') ? 'rgb(255, 255, 255)' : val;
        return val;
    }
};

Y.each(['backgroundColor',
        'borderTopColor',
        'borderRightColor', 
        'borderBottomColor', 
        'borderLeftColor'],
        function(v, i) {
            Y.Anim.behaviors[v] = Y.Anim.behaviors.color;
        }
);