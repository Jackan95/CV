(function() {
  console.log("It's alive!")
    // Create a new instance of Overworld
    const overworld = new Overworld({
        element: document.querySelector('.game-container')
    }); 

    // Call the Infinity method
    overworld.init();

})();