import React from "react";
import { TextInput, View, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components/native";

const SubmitButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  margin-top: 10px;
`;

const SubmitButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .min(3, "Tối thiểu 3 ký tự")
    .required("Không được để trống"),
});

export default function TodoForm({ onSubmit, initialValues = { text: "" } }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={{ margin: 10 }}>
          <TextInput
            placeholder="Nhập công việc"
            onChangeText={handleChange("text")}
            onBlur={handleBlur("text")}
            value={values.text}
            style={{
              borderColor: touched.text && errors.text ? "red" : "#ccc",
              borderWidth: 1,
              padding: 10,
              borderRadius: 4,
              marginBottom: 10,
            }}
          />

          {touched.text && errors.text && (
            <Text style={{ color: "red", marginBottom: 10 }}>
              {errors.text}
            </Text>
          )}

          <SubmitButton onPress={handleSubmit}>
            <SubmitButtonText>Lưu</SubmitButtonText>
          </SubmitButton>
        </View>
      )}
    </Formik>
  );
}
