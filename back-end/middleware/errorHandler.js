export const notFound = (req, res) => res.status(404).json({ message: 'Not found' });

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
};
