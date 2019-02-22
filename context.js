// import TWEEN from 'tween.js';

const getNextTag = (currentTag) => {
  switch(currentTag) {
    case 'intro':
      return 'second';
  }
}

module.exports = (ctx) => {
  // Wait for the context to initialize
  ctx.onInitialize(() => {
    // Inject the animation() function
    // for use in Idyll expressions
    ctx.update({
      nextTag: (next) => {
        console.log('calling nextTag');
        const currentTag = ctx.data().tag;
        const updated = { currentPrompt: null };
        updated.tag = next || getNextTag(currentTag);
        console.log(updated);
        ctx.update(updated);
      },
      set: (key, value) => {

      }
    })
  })

  ctx.onUpdate((newData) => {
    console.log('context updated', newData);
  })

  // // Wait for the context to load in a browser
  // ctx.onMount(() => {
  //   // Tell TWEEN to start listening for animations
  //   const listenForAnimations = () => {
  //     const update = TWEEN.update();
  //     requestAnimationFrame(listenForAnimations);
  //   };
  //   listenForAnimations();
  // })
}