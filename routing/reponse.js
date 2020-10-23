module.exports = ({
  succes: (res, data, status = 200) => {
    return res.status(status).json(data)
  },
  error: (res, error, status = 400) => {
    return res.status(status).json({ ...error })
  }
})