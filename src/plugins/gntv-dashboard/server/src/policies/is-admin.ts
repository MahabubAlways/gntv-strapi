const isAdmin = async (policyContext, config, { strapi }) => {
  const { user } = policyContext.state;
  // Add your policy logic here
  if (user && user.role && user.role.name === 'Subscriber') {
    return true;
  } else {
    return false;
  }
};

export default isAdmin;
