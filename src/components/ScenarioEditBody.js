import React from 'react';
import { Form } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { motion } from "framer-motion/dist/framer-motion";

function ScenarioEditBody({name, time, show, onClose, handleSave}) {

  const { 
    register, handleSubmit, formState: { errors } 
  } = useForm(
    { defaultValues: { 
      scenarioName: name, 
      scenarioTime: time } 
    }
  );

  const onSubmit = (data) => {
    handleSave(data);
  }

  return (
    
    <div className={`modal ${show ? 'show' : ''}`} onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
                <h2 className="modal-title">Edit Scenario</h2>
            </div>
            <div className="modal-body">

              <Form onSubmit={handleSubmit(onSubmit)}>

                <Form.Field>
                    <label>Scenario Name</label>
                    <input 
                      placeholder='Scenario Name' 
                      type="text" 
                      {...register("scenarioName", { 
                        required: true,
                        pattern: /^[a-zA-Z0-9_/][a-zA-Z0-9_ ]*[a-zA-Z0-9_]$/
                      })}
                    />
                </Form.Field>
                {errors.scenarioName && <p className="error">Name cannot have any special character excep "_"</p>}
                <Form.Field>
                    <label>Scenario Time</label>
                    <input 
                      placeholder='Scenario Time' 
                      type="number" 
                      {...register("scenarioTime", { 
                        required: true, 
                        pattern: /^[0-5]$/
                      })}
                    />
                </Form.Field>
                {errors.scenarioTime && <p className="error">Value must be in the range 1 and 5</p>}

                <div className="modal-footer">
                  <motion.button 
                    className="button blue-btn" 
                    type="submit"
                    whileTap={{scale : 0.9}}
                  >
                    Add
                  </motion.button>

                  <motion.button 
                    className="button red-btn" 
                    onClick={onClose}
                    whileTap={{scale : 0.9}}
                  >
                    Close
                  </motion.button>
                </div>
              </Form>

            </div>
        </div>
    </div>
  )
}
export default ScenarioEditBody