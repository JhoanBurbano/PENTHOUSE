
import React from 'react'
import Input from '../atoms/Input'
import Button from '../atoms/Button'

interface Props {
    onSubmit: () => void
    topChildren?: React.ReactNode
}

const ContactForm = ({ onSubmit, topChildren }: Props) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit()
    }
  return (
    <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
    <h1 className="text-2xl font-serif text-center">Contact the seller</h1>
    {topChildren}
    <Input
      label="Name"
      type="text"
      placeholder="Your name"
      value={""}
      onChange={() => {}}
    />
    <Input
      label="Email"
      type="email"
      placeholder="Your email"
      value={""}
      onChange={() => {}}
    />
    <Input
      label="Phone"
      type="tel"
      placeholder="Your phone"
      value={""}
      onChange={() => {}}
    />
    <Input
      label="Message"
      type="textarea"
      placeholder="Your message"
      value={""}
      onChange={() => {}}
    />
    <Button label="Send message" onClick={() => {}} />
  </form>
  )
}

export default ContactForm