/*!
 * jQuery checkAll Plugin - v0.0.1 - 2016/01/26
 *
 * https://github.com/simivar/jquery-checkall
 *
 * Copyright (c) 2016 simivar; Licensed MIT
 */
(function ($)
{
	"use strict";

	$.extend($.fn, {
		checkall: function (options)
		{
			return this.each(function () {
				listenToClick(this, options);
			});
		},
		check: function(value)
		{
            return check(this, value);
		}
	});

	function listenToClick(elem, options)
	{
		var _count_checked = 0;

		// override default settings
		var settings = $.extend({
			target: null,
			uniform: false,
			icheck: false,
			onAnyTargetChecked: function (count){},
			onNoTargetChecked: function(){},
			onTargetClick: function(target){},
			onElementClick: function(elem){}
		}, options);

		if (settings.target === null && typeof settings.target === "object") {
			throw new Error( "checkAll: element has no target specified." );
		}
        
        if (settings.uniform) {
            if (!("uniform" in jQuery(this))) {
                throw new Error( "checkAll: setting 'uniform' set to 'true' yet can not locate uniformjs.")
            }
        }
        
        if (settings.icheck) {
            if (!("icheck" in jQuery(this))) {
                throw new Error( "checkAll: setting 'icheck' set to 'true' yet can not locate iCheck.")
            }
        }

		var $elem = $(elem),
			$target = $(settings.target);

		function refreshPlugins()
		{
			if (settings.uniform) {
                $.uniform.update( $target );
                $.uniform.update( $elem );
			}

			if (settings.icheck) {
                $target.iCheck( 'update' );
                $elem.iCheck( 'update' );
			}
		}

		function countChecked()
		{
			_count_checked = $( settings.target + ':checked' ).length;

			if (_count_checked > 0) {
				settings.onAnyTargetChecked( _count_checked );
			} else {
				settings.onNoTargetChecked();
			}
		}

		$elem.on('click', function (e)
		{
			$target.check( $elem.check() );
			countChecked();
			settings.onElementClick( $(e.target) );

			refreshPlugins();
		});

		$target.on('click', function (e)
		{
			countChecked();

			settings.onTargetClick( $( e.target ) );

			var all = $target.length;

			if (_count_checked === all) {
				$elem.check( true );
			} else
			{
				$elem.check( false );
			}

			refreshPlugins();
		});
	}
    
    function check(elem, value){
        var $elem = $(elem);
        
        if(typeof value === typeof undefined){
            if(elem.length > 1){
                return false;
            }
            
            if ("prop" in jQuery(this)) {
                return $elem.prop('checked');
            }
            
            if ("attr" in jQuery(this)) {
                return $elem.attr('checked');
            }
        } else {
            if ("prop" in jQuery(this)) {
                $elem.prop('checked', value);
            }
            
            if ("attr" in jQuery(this)) {
                $elem.attr('checked', value);
            }
                
            return $elem;
        }
    }

})(jQuery);