export const validateInputs = (form, setFeedback) => {
    let isValid = true;
    const updatedFeedback = {
      date: '',
      title: '',
      description: '',
      mood: ''
    };

    if (!form.date) {
      updatedFeedback.date = 'Date is required';
      isValid = false;
    }

    if (!form.title) {
      updatedFeedback.title = 'Title is required';
      isValid = false;
    }

    if (!form.description) {
      updatedFeedback.description = 'Description is required';
      isValid = false;
    }

    if (!form.mood) {
      updatedFeedback.mood = 'Mood is required';
      isValid = false;
    }

    setFeedback(updatedFeedback);

    return isValid;
  };