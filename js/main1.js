// script.js

document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  const button = document.querySelector('button');
  const leftArrow = document.querySelector('.left');
  const rightArrow = document.querySelector('.right');
  const indicatorParents = document.querySelector('.controls ul');
  var sectionindex = 0;
  var totalWaterFootprint = 0;

  function setIndex() {
      document.querySelector('.controls .selected').classList.remove('selected');
      slider.style.transform = 'translate(' + (sectionindex) * -20 + '%)';
  }

  document.querySelectorAll('.controls li').forEach(function (indicator, ind) {
      indicator.addEventListener('click', function () {
          sectionindex = ind;
          setIndex();
          indicator.classList.add('selected');
      });
  });

  rightArrow.addEventListener('click', function () {
      sectionindex = (sectionindex < 4) ? sectionindex + 1 : 4;
      indicatorParents.children[sectionindex].classList.add('selected');
      setIndex();
  });

  leftArrow.addEventListener('click', function () {
      sectionindex = (sectionindex > 0) ? sectionindex - 1 : 0;
      indicatorParents.children[sectionindex].classList.add('selected');
      setIndex();
  });

  button.addEventListener('click', function () {
      // Calculate the total water footprint based on selected options
      totalWaterFootprint = calculateWaterFootprint();
      // Display the result
      document.getElementById('totalValue').innerText = totalWaterFootprint.toFixed(2);
      setLastParagraph(totalWaterFootprint);
  });

  function calculateWaterFootprint() {
      const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
      let total = 0;

      selectedOptions.forEach(function (option) {
          total += parseFloat(option.value);
      });

      return total;
  }

  function setLastParagraph(totalWaterFootprint) {
      const lastParagraph = document.getElementById('lastpara');
      if (totalWaterFootprint <= 2250) {
          lastParagraph.innerText = 'Congratulations! Your water footprint is low.';
      } else if (totalWaterFootprint <= 5000) {
          lastParagraph.innerText = 'Your water footprint is moderate. Consider ways to reduce water usage.';
      } else {
          lastParagraph.innerText = 'Warning! Your water footprint is high. Take steps to conserve water.';
      }
  }
});