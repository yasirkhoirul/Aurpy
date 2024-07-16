import { Children } from "react"
import { Navigasi } from ".."


const Layoutlogin = (props) => {
    const {children} = props

    return (
    <section className="h-dvh bg-putih flex md:flex-row justify-center flex-col-reverse">
        <div className="gap-5 flex-1 basis-1/2 justify-center p-2 bg-putih items-center flex flex-col" >
            {children && children[0]}
        </div>
      
        <div className="gap-5 flex-1 basis-1/2 justify-center p-2 bg-ijo items-center flex flex-col mt-20 md:-mt-20 rota" >
            {children && children[1]}
        </div>
    </section>
    )
}

const LayoutUtama = (props) => {
    const {children} = props
    return(
    <>
    <Navigasi></Navigasi>
    {children}
    </>
    )

}

export default Layoutlogin;
export {LayoutUtama}