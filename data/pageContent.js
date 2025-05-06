const pageContent = {
  home: {
    hero: {
      heading: 'Soul Signals',
      subtitle: 'Microdoses of wisdom for truth seekers.',
      description:
        'Subscribe to the Soul Signals newsletter for short insights on mindfulness & daily self-cultivation.',
    },
    posts: {
      micro: {
        heading: 'Microdoses',
      },
      macro: {
        heading: 'Macrodoses',
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
