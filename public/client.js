
(function (global, $) {




  $(function () {
    
    console.log("test");
      
   
   // let controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}


    //new ScrollMagic.Scene({triggerElement: "#wrapper"})
			//		.setTween("#background > div", {y: "80%", ease: Linear.easeNone})
				//	.addIndicators()
					//.addTo(controller);
  

    
    
    
  });
})(window, jQuery);


/*
	$(function () { // wait for document ready
		// init
		var controller2 = new ScrollMagic.Controller();

		// define movement of panels
		var wipeAnimation = new TimelineMax()
			// animate to second panel
			.to("#slideContainer", 0.5, {z: -150})		// move back in 3D space
			.to("#slideContainer", 1,   {x: "-25%"})	// move in to first panel
			.to("#slideContainer", 0.5, {z: 0})				// move back to origin in 3D space
			// animate to third panel
			.to("#slideContainer", 0.5, {z: -150, delay: 1})
			.to("#slideContainer", 1,   {x: "-50%"})
			.to("#slideContainer", 0.5, {z: 0})
			// animate to forth panel
			.to("#slideContainer", 0.5, {z: -150, delay: 1})
			.to("#slideContainer", 1,   {x: "-75%"})
			.to("#slideContainer", 0.5, {z: 0});

		// create scene to pin and link animation
		new ScrollMagic.Scene({
				triggerElement: "#pinContainer",
				triggerHook: "onLeave",
				duration: "500%"
			})
			.setPin("#pinContainer")
			.setTween(wipeAnimation)
			.addIndicators() // add indicators (requires plugin)
			.addTo(controller2);
	});
*/