import freshImg from '../../../images/xpcx金锣去皮五花肉_@2x.png'
import { CardListType } from '../types'

type CardPropsType = {
    title: string,
    freshes: CardListType | undefined
}


const Card = (props: CardPropsType) => {
    let { title, freshes } = props

    return (
        <div className="card">
            <h3 className="card-title">
                <img alt={title} className="card-title-img" src="http://statics.dell-lee.com/shopping/hot.png" />
                { title }
                <div className="card-title-more">
                    更多<span className="iconfont">&#xe7ad;</span>
                </div>
            </h3>
            <div className="card-content">
                {
                    (freshes || []).map((item) => {
                        return (
                            <div className="card-content-item" key={item.id}>
                                <img alt={item.name} className="card-content-item-img" src={item.imgUrl ? item.imgUrl : freshImg} />
                                <p className="card-content-item-desc">{item.name}</p>
                                <div className="card-content-item-price">
                                    <span className="card-content-item-yen">¥</span>{item.price}
                                    <div className="iconfont">&#xe758;</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Card