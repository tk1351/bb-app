import React from 'react'
import Button from '@material-ui/core/Button';

const SubmitBestBuy = () => {
  return(
    <div className="container">
      <p>BestBuyを投稿する</p>
      <form>
        <div className="form-group">
          <textarea></textarea>
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">投稿</Button>
        </div>
      </form>

    </div>
  )
}

export default SubmitBestBuy