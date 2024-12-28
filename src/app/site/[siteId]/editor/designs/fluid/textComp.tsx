import React, { useState, useRef } from 'react';
import ContentEditable from "react-contenteditable";

interface TextComponentProps {
  isSelected: boolean;
  initialText?: string;
  onTextChange: (text: string) => void;
}

const TextComp: React.FC<TextComponentProps> = ({
  isSelected,
  initialText = "Double click to edit text",
  onTextChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const contentEditableRef = useRef<any>();

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onTextChange(text);
  };

  const handleChange = (evt: any) => {
    setText(evt.target.value);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing) {
      e.stopPropagation();
    }
  };

  return (
    <ContentEditable
      innerRef={contentEditableRef}
      html={text}
      disabled={!isEditing}
      onChange={handleChange}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
      className={`w-full h-full p-2 outline-none ${
        isEditing 
          ? 'cursor-text' 
          : 'cursor-move'
      } ${
        isSelected && !isEditing 
          ? 'outline outline-1'
          : ''
      }`}
      onDoubleClick={handleDoubleClick}
    />
  );
};

export default TextComp;