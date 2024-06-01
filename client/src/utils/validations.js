import * as Yup from "yup";

export const quizDetailsSchema = Yup.object().shape({
  quizName: Yup.string().required("Quiz name is required"),
  quizType: Yup.string().required("Quiz type is required"),
});

const optionSchema = Yup.object().shape({
  text: Yup.string().nullable(),
  image: Yup.string().nullable(),
}).test('textOrUrl', 'Either text or URL must be provided', function (value) {
  const { text, image } = value;
  return !!text || !!image;
});

export const questionSchema = Yup.object().shape({
  question: Yup.string().required("Question text is required."),
  optionsType: Yup.string().required("Option type must be selected."),
  options: Yup.array()
    .of(optionSchema)
    .min(2, 'There must be at least two options')
    .test('optionsTest', 'Each option must have either text or URL', function (value) {
      const isValid = value.every(option => !!option.text || !!option.image);
      if (!isValid) {
        return this.createError({ path: 'options', message: 'Each option must have either text or URL' });
      }
      return true;
    }),
  answer: Yup.number()
    .min(0, "A correct answer must be selected."),
  timer: Yup.number().min(0, "Timer must be a non-negative number."),
});

