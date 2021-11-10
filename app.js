//   Task#2 - სლაიდერები
const slides = document.querySelectorAll('.slide-item');
const slidesLength = slides.length;
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');
const stopBtn = document.querySelector('#stop-sliding');
const startBtn = document.querySelector('#start-sliding');
let activeIndex = 0;
function renderSlider() {
    slides.forEach((element, index) => {
      element.style.transform = `translateX(${100 * (index - activeIndex % slidesLength)}%)`;
    })
  };
  function nextSlide(){
    if (activeIndex=== (slidesLength - 1)){
        activeIndex = 0;
    }else {
        activeIndex = activeIndex + 1;
    }
    renderSlider();
};
function prevSlide(){
    if (activeIndex=== 0){
        activeIndex = slidesLength - 1;
    }else {
        activeIndex = activeIndex - 1;
    }
    renderSlider();
};
renderSlider();
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);
// იგივე გადმოტანილი
document.addEventListener('keydown', (e) => {
    // console.log(e.code);
if(e.code === 'ArrowRight'){
    nextSlide();
}
if(e.code === 'ArrowLeft'){
    prevSlide();
}
});
    
// IntervalID
let intervalId = null;
function startAutoSliding() {
if(!intervalId){
    intervalId = setInterval(() => {
    nextSlide();
    }, 3000);
}
}
// ავტოსლაიდინგის დამატება 
const mouseMove = document.querySelector(".slide-area");
function stopAutoSliding (){
    console.log(stopAutoSliding)
    if (startAutoSliding) {
        clearInterval(intervalId);
        intervalId = null;
    }
}
mouseMove.addEventListener('mouseenter', stopAutoSliding);
mouseMove.addEventListener('mouseleave', startAutoSliding);

// Task 2, 19 less - 2. არსებულ ფორმში დაამატეთ 2 ველი personal_number და mobile_number.


const slideArea = document.querySelector('.slide-area');
const dots = document.querySelectorAll('.dots span');
dots.forEach((dot) => {
  dot.addEventListener('click', e => {
    const index = e.target.getAttribute('data-index');
    activeIndex = Number(index);
    dots.forEach((dot) => {
      dot.classList.remove('active');
    });
    e.target.classList.add('active');
    renderSlider();
  })
});

slideArea.addEventListener('mouseenter', e => {
  // console.log('mouseenter')
  stopAutoSliding()
});
//2
slideArea.addEventListener('mouseleave', e => {
  // console.log('mouseleave')
  startAutoSliding();
});

const formValidator = (form, fieldsConfig, onValidateSuccess, onValidationError) => {

    const validateField = (fieldElement, fieldConfig) => {
      const value = fieldElement.value;
      const rules = fieldConfig.rules;
      const formGroup = fieldElement.closest('.form-group');
      const errorElement = formGroup.querySelector('.form-error-message');
  
      const fieldValidationResult = {name: fieldConfig.name, value: value, errors: []};
      rules.forEach(rule => {
        if (rule.required && !value) {
          fieldValidationResult.errors.push(rule.message);
        }
        if (rule.maxLength && `${value}`.length > rule.maxLength) {
          fieldValidationResult.errors.push(rule.message);
        }
      });
  
      if(fieldValidationResult.errors.length > 0){
        errorElement.innerText = fieldValidationResult.errors.join('\n');
      } else {
        errorElement.innerText = '';
      }
      // console.log(fieldValidationResult);
  
      return fieldValidationResult;
    }
  
    const validateOnChange = () => {
      fieldsConfig.forEach((fieldConfig) => {
        const fieldElement = form.querySelector(`[name="${fieldConfig.name}"]`);
        fieldElement.addEventListener('input', e => {
          validateField(e.target, fieldConfig);
        });
      })
    }
  
    const validateOnSubmit = () => {
      const validatedFields = [];
      fieldsConfig.forEach((fieldConfig) => {
        const fieldElement = form.querySelector(`[name="${fieldConfig.name}"]`);
        validatedFields.push(validateField(fieldElement, fieldConfig));
      });
  
      return validatedFields;
    }
  
    const listenFormSubmit = () => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        console.log('submit');
        const errors = [];
        const validationResult = validateOnSubmit();
        validationResult.forEach(result => {
          errors.push(...result.errors);
        });
        if(errors.length === 0){
          onValidateSuccess(validationResult);
        }else {
          onValidationError(validationResult);
        }
        console.log(validationResult);
      });
    }
    listenFormSubmit();
    validateOnChange();
  }
  
  const fieldsConfig = [
    {
      name: 'first_name',
      rules: [
        {required: true, message: 'First name is required.'},
        {maxLength: 10, message: 'სიბოლოების რაოდენობა უნდა იყოს 10 ზე ნაკლები ან ტოლი'},
      ]
    },
    {
      name: 'last_name',
      rules: [
        {required: true, message: 'Last name is required.'},
      ]
    },
    {
      name: 'zip_code',
      rules: [
        {required: true, message: 'Zip Code name is required.'},
      ]
    },
    {
        name: 'Mobile Number',
        rules: [
          {required: true, message: 'Mobile number is required.'},
          {maxLength: 10, message: 'სიბოლოების რაოდენობა არ უნდა იყოს 9 ზე ნაკლები'},
        ]
    },
      {
        name: 'fPersonal Number',
        rules: [
          {required: true, message: 'ID number is required.'},
          {maxLength: 10, message: 'სიბოლოების რაოდენობა უნდა იყოს 12-ის ტოლი'},
        ]
    },
   ];
  
  
  const form = document.querySelector('#user-registraion-form');
  
  const onFormSubmitSuccess = (fields) => {
    console.log('We can send data to server', fields);
  }
  const onFormSubmitError = (fields) => {
    console.log('Error', fields);
  }
  
  formValidator(form, fieldsConfig, onFormSubmitSuccess, onFormSubmitError);
  