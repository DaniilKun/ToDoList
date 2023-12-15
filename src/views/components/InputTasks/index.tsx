import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from './index.module.scss';

interface InputTaskProps {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

const InputTask: React.FC<InputTaskProps> = ({ id, title, onDone, onEdited, onRemoved }) => {
  const [checked, setChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(isEditMode) {
      editTitleInputRef?.current?.focus()
    }
  },[isEditMode])

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          disabled={isEditMode}
          type="checkbox"
          checked={checked}
          className={styles.inputTaskCheckbox}
          onChange={(event) => {
            setChecked(event.target.checked);
            if (event.target.checked) {
              setTimeout(() => {
                onDone(id);
              },300)
            }
          }}
        />
        {isEditMode ? (
          <input
            value={value}
            ref = {editTitleInputRef}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            onKeyDown={(event) => {
              if(event.key === 'Enter') {
                onEdited(id,value)
                setIsEditMode(false)
              }
            }}
            className={styles.inputTaskTitleEdit}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>
      {isEditMode ? (
        <button
          aria-label="Save"
          className={styles.inputTaskSave}
          onClick={() => {
            onEdited(value, id);
            setIsEditMode(false);
          }}></button>
      ) : (
        <button
          aria-label="Edit"
          className={styles.inputTaskEdit}
          onClick={() => {
            setIsEditMode(true);
          }}></button>
      )}

      <button
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() => {
          if (confirm('Вы уверены?')) {
            onRemoved(id);
          }
        }}></button>
    </div>
  );
};

export default InputTask;
