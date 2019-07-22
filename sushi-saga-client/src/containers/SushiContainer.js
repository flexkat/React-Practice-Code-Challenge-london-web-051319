import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  
  return (
    <Fragment>
      <div className="belt">
        {props.renderSushi.map(sushi => <Sushi sushi={sushi} emptyPlates={props.emptyPlates} eatSushi={props.eatSushi}/>)
        }
        <MoreButton handleClick={props.handleClick}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer