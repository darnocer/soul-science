const pageContent = {
  home: {
    hero: {
      heading: 'Soul Signals',
      subtitle: 'Microdoses of wisdom for curious truth seekers.',
      description:
        'Subscribe to the Soul Signals newsletter for practical insights on mindful living and daily self-cultivation practices.',
    },
    posts: {
      micro: {
        heading: 'Microdoses',
        description: 'Bite-sized practical insights for daily living.',
      },
      macro: {
        heading: 'Macrodoses',
        description: 'Expanded guides for deeper practice.',
      },
    },
  },
  newsletter: {
    blogTitle: 'Does this resonate?',
    blogDescription: 'Subscribe to occasionally get notified of new posts to your inbox.',
    termsError: 'You must agree to the terms before subscribing.',
    emailError: 'Oops. Your e-mail address is invalid or you are already subscribed!',
    success: 'Please check your email to confirm your subscription.',
    placeholder: 'Enter your email',
    placeholderSubscribed: "Thanks! You're in! 🎉",
    button: 'Sign Up',
    consent: 'I agree to receive emails and understand I can unsubscribe at anytime.',
    disclaimer: 'No funny business with your personal data, ever. Promise.',
  },
  posts: {
    title: 'All Posts',
    description: null,
  },
  resources: {
    title: 'Goodies',
  },
  tags: {
    title: 'Topics',
    description: 'All post topics',
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
