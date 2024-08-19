import { useCallback, useEffect, useRef } from 'react'
import "./style.scss"
import { useNavigate } from 'react-router-dom'

function Guide() {
  // 处理动画相关的逻辑
  const ref = useRef<HTMLDivElement>(null!)
  useEffect(() => {
    ref.current.style.opacity = '1'
  }, [])

  // 处理页面跳转相关的逻辑
  const navigate = useNavigate()
  const handleIconClick = useCallback(() => {
    if (localStorage.getItem('token')) {
        navigate('/home')
    } else {
        navigate('/account/login')
    }
  }, [navigate])

  return (
    <div ref={ref} className="page guide-page">
      <img
        alt="欢乐购"
        className="main-pic"
        src={require("../../images/halg_logo_icon_@2x.png")}
      />
      <p className="title">欢乐购</p>
      <img
        alt="欢乐购"
        className="sub-pic"
        src={require("../../images/slogn_word_icon_@2x.png")}
      />
      <div
        className="iconfont arrow-icon"
        onClick={handleIconClick}
      >&#xe60c;</div>
    </div>
  );
}

export default Guide;