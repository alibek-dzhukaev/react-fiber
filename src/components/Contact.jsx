import {motion} from "framer-motion";
import {SectionWrapper} from "../hoc/index.js";
import {useRef, useState} from "react";
import {slideIn} from "../utils/motion.js";
import {styles} from "../styles.js";
import {EarthCanvas} from "./canvas/index.js";
import emailjs from '@emailjs/browser'

const Contact = () => {
    const formRef = useRef()
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm({...form, [name]: value})

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await emailjs.send(
                import.meta.env.SERVICE_ID,
                import.meta.env.TEMPLATE_ID,
                {
                    from_name: form.name,
                    to_name: import.meta.env.TO_NAME,
                    from_email: form.email,
                    to_email: import.meta.env.TO_EMAIL,
                    message: form.message,
                },
                import.meta.env.PUBLIC_KEY
                )
            alert('thank u')
            setForm({
                name: '',
                email: '',
                message: ''
            })
        } catch (error) {
            console.error(error)
            alert('something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
            <motion.div
                variants={slideIn('left', 'tween', 0.2, 1)}
                className='flex-[0.75] bg-black-100 rounded-2xl p-8'
            >
                <p className={styles.sectionSubText}>Get in touch</p>
                <h3 className={styles.sectionHeadText}>Contact.</h3>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className='mt-12 flex flex-col gap-8'
                >
                    <label className='flex flex-col'>
                        <span className='text-white font-medium mb-4'>Your name</span>
                        <input
                            type="text"
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            placeholder="What's your name?"
                            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span className='text-white font-medium mb-4'>Your Email</span>
                        <input
                            type="email"
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            placeholder="What's your email?"
                            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span className='text-white font-medium mb-4'>Your message</span>
                        <textarea
                            rows='7'
                            name='message'
                            value={form.message}
                            onChange={handleChange}
                            placeholder="What do you want to say?"
                            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                        />
                    </label>

                    <button
                        type='submit'
                        className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
                    >
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </motion.div>

            <motion.div
                variants={slideIn('right', 'tween', 0.2, 1)}
                className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
            >
                <EarthCanvas/>
            </motion.div>
        </div>
    )
}

export default SectionWrapper(Contact, 'contact')
