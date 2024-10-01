import { CategoriesType } from '../types'
import vegetableImg from '../../../images/home_xxsc_icon_@2x.png'

type CategoryPropsType = {
    categories: CategoriesType | undefined
}

const Category = (props: CategoryPropsType) => {
    let { categories } = props

    return (
        <div className='category'>
            {
                (categories || []).map((item) => {
                    return (
                        <div className="category-item" key={item.id}>
                            <img className="category-item-img" alt={item.name} src={item.imgUrl ? item.imgUrl : vegetableImg} />
                            <p className="category-item-desc">{item.name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Category