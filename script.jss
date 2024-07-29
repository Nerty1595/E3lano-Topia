document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.earnings-value');

  const updateCount = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const speed = 650; // Adjust to control the speed

    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => updateCount(counter), 7);
    } else {
      counter.innerText = target;
    }
  };

  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateCount(entry.target);
        observer.unobserve(entry.target); // Stop observing once the counter starts
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1 // Trigger when 10% of the element is visible
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
});
