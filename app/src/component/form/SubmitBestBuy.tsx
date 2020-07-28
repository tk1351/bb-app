import React from 'react'

const SubmitBestBuy = () => {
  return(
    <div className="container">
      <p>BestBuyを投稿する</p>
      <form>
        <div className="form-group">
          <textarea></textarea>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">投稿</button>
        </div>
      </form>

    </div>
  )
}

export default SubmitBestBuy