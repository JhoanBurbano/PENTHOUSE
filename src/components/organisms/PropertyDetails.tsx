import React, { useState } from "react";
import Modal from "../atoms/Modal";
import { Property } from "@/types/Property";
import Image from "next/image";
import ParagraphExpandable from "../atoms/ParagraphExpandable";
import Price from "../atoms/Price";
import {
  Bathtub01Icon,
  BedSingle02Icon,
  GarageIcon,
  RulerIcon,
} from "hugeicons-react";
import IconLabel from "../atoms/IconLabel";
// import CardImage from "../atoms/CardImage";
import Button from "../atoms/Button";
import Badge from "../atoms/Badge";
import ContactForm from "../molecules/ContactForm";
import CardImage from "../atoms/CardImage";

interface Props {
  property: Property | null;
  open: boolean;
  onClose: () => void;
}

const PropertyDetails = ({ property, open, onClose }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const __renderContent = () => {
    if (!property) return null;
    return (
      <article className="flex flex-col gap-4">
        <figure className="relative w-full h-[300px] overflow-hidden rounded-lg">
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="object-cover"
          />
        </figure>
        <div className="relative">
            <Price amount={property.price}  className="justify-start md:hidden" />
            <Badge text={property.year.toString()} className="absolute top-0 right-0 md:hidden" />
          <span className="flex items-start gap-1">
            {/* <Location01Icon size={20} className="mt-1" /> */}
            <h1 className="text-[17px] leading-5 md:text-2xl font-serif uppercase ">
              {property.address.addressText}
            </h1>
          </span>
            <Price amount={property.price} className="hidden md:flex" />
          <p className="font-medium text-gray-600 text-sm md:text-md">{property.name}</p>
        </div>
        <ParagraphExpandable
          text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
            vitae quam sequi, ad rerum tempora animi voluptatibus nostrum sint
            asperiores culpa pariatur, explicabo doloremque odit eaque voluptatum
            error nisi fugit. Dolorem officia, aliquam numquam molestiae magnam
            omnis at commodi magni accusamus minus culpa enim, veritatis
            excepturi. Ut rem tempore consequatur, cum dolore facere totam et
            dolor, recusandae, facilis explicabo porro. Nobis quam natus fuga
            quidem ratione accusantium, dolores optio molestiae asperiores maxime.
            Obcaecati, distinctio quaerat repellendus id culpa minima qui tempore
            fugit nam perspiciatis mollitia!"
          className="text-[12px] text-gray-400"
        />
        <hr />
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center justify-between gap-2 w-full">
            <IconLabel
              icon={<BedSingle02Icon size={20} />}
              message="bed."
              label={"4"}
            />
            <IconLabel
              icon={<Bathtub01Icon size={20} />}
              message="bath."
              label={"2"}
            />
            <IconLabel
              icon={<RulerIcon size={20} />}
              message="sqft."
              label={"1500"}
            />
            <IconLabel
              icon={<GarageIcon size={20} />}
              message="garage."
              label={"2"}
            />
          </div>
        </div>
        <hr />
        {
          !showForm && (
            <>
            <h2>Seller information</h2>
            <div>
              <CardImage title={property?.owner?.name} subtitle={property?.owner?.email_address} image={property?.owner?.photo} />
            </div>
            <hr />
            </>
          )
        }
        {!showForm && (
          <Button
            label="Contact the seller"
            onClick={() => setShowForm(true)}
          />
        )}
        {showForm && (
          <ContactForm onSubmit={() => setShowForm(false)} topChildren={
            <CardImage title={property?.owner?.name} subtitle={property?.owner?.email_address} image={property.owner?.photo} />

          } />
        )}
      </article>
    );
  };
  if(!property) return null;
  return (
    <Modal open={open} onClose={onClose} title="Property details">
      {__renderContent()}
    </Modal>
  );
};

export default PropertyDetails;
