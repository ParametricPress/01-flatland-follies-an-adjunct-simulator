import TWEEN from 'tween.js';

const getNextTag = (currentTag) => {
  switch(currentTag) {
    case 'intro':
      return 'second';
  }
}

let valueElements = {};

module.exports = (ctx) => {
  // Wait for the context to initialize
  ctx.onInitialize(() => {
    // Inject the animation() function
    // for use in Idyll expressions
    ctx.update({
      getNextDay: () => {
        const { money, selfActualization } = ctx.data();
        if (money >= 100) {
          return "high-money";
        } else if (money <= 0) {
          return "low-money";
        } else if (selfActualization <= 0) {
          return "low-self-actualization";
        } else if (selfActualization >= 100) {
          return "high-self-actualization";
        }
        return "start-day";
      },
      nextTag: (next) => {
        // console.log('calling nextTag');
        const currentTag = ctx.data().tag;
        const updated = { currentPrompt: null };
        updated.tag = next || getNextTag(currentTag);
        // console.log(updated);
        ctx.update(updated);
      },
      set: (key, value, time) => {
        const oldVal = ctx.data()[key]
        let _tween = { value : oldVal };
        console.log('tweening! ', key, value);

        valueElements[key].classList.add(value > oldVal ? 'parametric-value-increased' : 'parametric-value-decreased' );
        setTimeout(() => {
          valueElements[key].classList.remove(value > oldVal ? 'parametric-value-increased' : 'parametric-value-decreased' );
        }, 1000);
        new TWEEN.Tween(_tween)
          .to({value: value}, time === undefined ? 750 : time)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onUpdate(() => {
            const updated = {};
            updated[key] = _tween.value;
            ctx.update(updated);
          }).start();
      }
    })
  })

  ctx.onUpdate((newData) => {
    // console.log('context updated', newData);
  })

  ctx.onMount(() => {
    window.IDYLL_CONTEXT = ctx;
    valueElements.selfActualization = document.getElementsByClassName("parametric-scoreboard-value self-actualization")[0];
    valueElements.day = document.getElementsByClassName("parametric-scoreboard-value day")[0];
    valueElements.money = document.getElementsByClassName("parametric-scoreboard-value money")[0];

    // Tell TWEEN to start listening for animations
    const listenForAnimations = () => {
      const update = TWEEN.update();
      requestAnimationFrame(listenForAnimations);
    };
    listenForAnimations();
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