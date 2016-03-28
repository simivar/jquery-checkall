var $checked = $( "#checked" ),
		$unchecked = $( "#unchecked" ),
		$controller = $( "#controller" ),
		$testInputOne = $( ".checkme1" ),
		$testInputTwo = $( ".checkme2" );

QUnit.test( ".check() get value", function( assert ) {
	assert.expect( 2 );

	if( $checked.check() === $checked.prop('checked') ){
		assert.ok(true, "check() working on checked inputs");
	}

	if( $unchecked.check() === $unchecked.prop('checked') ){
		assert.ok(true, "check() working on unchecked inputs");
	}
});

QUnit.test( ".check() set value", function( assert ) {
	assert.expect( 2 );

	$checked.check( false );
	$unchecked.check( true );

	if( $checked.check() === false ){
		assert.ok(true, "check() working on checked inputs");
	}

	if( $unchecked.check() === true ){
		assert.ok(true, "check() working on unchecked inputs");
	}
});

QUnit.test( "Check all targets with controller", function( assert ) {
	assert.expect( 2 );

	$controller.trigger( "click" );

	if( $testInputOne.check() === true ){
		assert.ok(true, "checked first input");
	}

	if( $testInputTwo.check() === true ){
		assert.ok(true, "checked second input");
	}
});

QUnit.test( "Uncheck all targets with controller", function( assert ) {
	assert.expect( 2 );

	var $controller = $( "#controller" ),
			$testInputOne = $( ".checkme1" ),
			$testInputTwo = $( ".checkme2" );

	$controller.trigger( "click" );

	if( $testInputOne.check() === false ){
		assert.ok(true, "unchecked first input");
	}

	if( $testInputTwo.check() === false ){
		assert.ok(true, "unchecked second input");
	}
});

QUnit.test( "Check controller with targets", function( assert ) {
	assert.expect( 1 );

	$testInputOne.trigger( "click" );
	$testInputTwo.trigger( "click" );

	if( $controller.check() === true ){
		assert.ok(true, "checked controller with targets");
	}
});

QUnit.test( "Uncheck controller with target", function( assert ) {
	assert.expect( 1 );

	$testInputOne.trigger( "click" );

	if( $controller.check() === false ){
		assert.ok(true, "unchecked controller with first target");
	}
});

QUnit.test( "UniformJS: check all targets with controller", function( assert ) {
	assert.expect( 1 );

	var $controllerUniform = $( "#controller-uniform"),
			$testInputOneUniform = $( ".checkme-uniform" );

	$controllerUniform.trigger( "click" );

	if( $testInputOneUniform.parent().hasClass("checked") === $testInputOneUniform.check() ){
		assert.ok(true, "Uniform controller checked targets");
	}
});


QUnit.test( "iCheck: check all targets with controller", function( assert ) {
	assert.expect( 1 );

	var $controllerICheck = $( "#controller-icheck"),
			$testInputOneICheck = $( ".checkme-icheck" );

	$controllerICheck.trigger( "click" );

	if( $testInputOneICheck.parent().hasClass("checked") === $testInputOneICheck.check() ){
		assert.ok(true, "iCheck controller checked targets");
	}
});
