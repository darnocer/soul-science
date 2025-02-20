const pageContent = {
  newsletter: {
    termsError: 'You must agree to the terms before subscribing.',
    emailError: 'Oops. Your e-mail address is invalid or you are already subscribed!',
    success: 'Please check your email to confirm your subscription.',
    placeholder: 'Enter your email',
    placeholderSubscribed: 'Success! 🎉 ',
    button: 'Sign Up',
    buttonSubscribed: 'Thank you!',
    consent: 'I agree to receive emails.',
    disclaimer: '',
  },
  posts: {
    title: 'All Posts',
    description: null,
  },
  tags: {
    title: 'Tags',
    description: 'Blog topics',
  },
  tag: {
    description: (tag) => `Posts tagged with #${tag}`,
  },
  types: {
    title: 'Content Types',
    description: 'Types of content',
  },
  type: {
    description: (type) => `Posts with a content type of '${type}'`,
  },
}
module.exports = pageContent
