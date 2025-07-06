"use client"

import React, { useState } from "react"
import "./category.css"
import backgroundImg from "./background.png"
import userImg from "./Assets/user image.jpg"

const CategoryPage = ({ onBack, onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [showValidation, setShowValidation] = useState(false)

  const categories = [
    {
      id: "student",
      title: "Student",
      image: userImg,
    },
    {
      id: "teaching-faculty",
      title: "Teaching Faculty",
      image: userImg,
    },
    {
      id: "Management",
      title: "Management",
      image: userImg,
    },
  ]

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId)
    setShowValidation(false)
  }

  const handleSelect = () => {
    if (selectedCategory && onCategorySelect) {
      onCategorySelect(selectedCategory)
    } else {
      setShowValidation(true)
    }
  }

  return (
    <div className="category-page" style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div className="overlap-wrapper">
        <div className="overlap">
          <button className="back-button" onClick={onBack}>&larr; Back</button>
          <div className="category-box" />
          <div className="category-top" />
          <div className="text-wrapper">Select Your Category</div>
          {showValidation && <div className="validation-hint">Please select a category to continue</div>}
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`card ${index === 0 ? "" : index === 1 ? "overlap-group-wrapper" : "div-wrapper"}`}
            >
              <div className="overlap-group">
                <div className="div">{category.title}</div>
                <img className="ellipse" alt={category.title} src={category.image} />
                <div
                  className="overlap-group-2"
                  onClick={e => {
                    e.stopPropagation();
                    if (onCategorySelect) onCategorySelect(category.id);
                  }}
                  style={{ cursor: 'pointer', opacity: 1 }}
                >
                  <div className="rectangle" />
                  <div className="text-wrapper-2">Select</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage