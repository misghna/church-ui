import { useState, useCallback, useMemo } from "react";

import _ from "lodash";
import * as Yup from "yup";

import { axiosPrivate } from "~/_api";
import config from "~/constants/endpoints.json";
import { useGlobalSetting } from "~/contexts/GlobalSettingProvider";

const currentConfig = import.meta.env.MODE === "development" ? config.test : config.prod;

const pageConfigInitial = {
  pageType: "",
  name: "",
  headerText: "",
  imageLink: "",
  parent: "",
  description: "",
  language: "",
  headerImage: "",
  orderNumber: 0
};
const useContentManager = () => {
  const [pageConfig, setPageConfig] = useState(pageConfigInitial);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState(1);
  const { setting } = useGlobalSetting();
  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const { labels } = setting;
  const [pageDialogTitle, setPageDialogTitle] = useState("");

  const schema = Yup.object().shape({
    pageType: Yup.string().required("Page Type is required"),
    name: Yup.string().required("name is required"),
    headerText: Yup.string().required("Header text is required "),
    parent: Yup.string().required("parent is required"),
    description: Yup.string(),
    language: Yup.string().required("language is required"),
    headerImage: Yup.string(),
    orderNumber: Yup.number(),
    imageLink: Yup.string(),
    id: Yup.string()
  });

  const validateField = useCallback(
    (name, value) => {
      schema
        .validateAt(name, { [name]: value })
        .then(() => {
          setErrors((prevErrors) => {
            return {
              ...prevErrors,
              [name]: ""
            };
          });
        })
        .catch((error) => {
          setErrors((prevErrors) => {
            return {
              ...prevErrors,
              [name]: error.message
            };
          });
        });
    },
    [schema]
  );
  const validateObject = useCallback(
    (formData) => {
      schema
        .validate(formData)
        .then(() => {
          setErrors({});
        })
        .catch((error) => {
          setErrors((prevErrors) => {
            return {
              ...prevErrors,
              ...error
            };
          });
        });
    },
    [schema]
  );

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setPageConfig((prevPageConfig) => {
        return {
          ...prevPageConfig,
          [name]: value
        };
      });
      validateField(name, value);
    },
    [validateField, setPageConfig]
  );
  const savePageConfig = useCallback(() => {
    validateObject(pageConfig);
    axiosPrivate
      .post(`/api/protected/${currentConfig.pageConfig}`, pageConfig)
      .then(({ data }) => {
        console.log("saved succefylly ", data);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
  }, [pageConfig, validateObject]);
  const handleTabChange = useCallback(
    (event, newValue) => {
      setActiveTab(newValue);
    },
    [setActiveTab]
  );

  const handleAddModalOpen = useCallback((title) => {
    setPageDialogTitle(title);
    setModalOpenAdd(() => true);
  }, []);
  const handleAddModalClose = useCallback(() => {
    setModalOpenAdd(false);
    setPageConfig(pageConfigInitial);
  }, [setModalOpenAdd, setPageConfig]);

  const updatePageConfig = useCallback(() => {
    validateObject(pageConfig);
    axiosPrivate
      .put(`/api/protected/${currentConfig.pageConfig}`, pageConfig)
      .then(({ data }) => {
        console.log("saved succefylly ", data);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
    setPageConfig(pageConfigInitial);
  }, [validateObject, pageConfig]);
  const populatePageConfigForm = useCallback(
    (row) => {
      const { id, name, page_type, parent, language, header_text, img_link, header_image, order_number, description } =
        row.original;

      const pageConfigTemp = {
        id: id,
        pageType: page_type,
        parent: parent,
        headerText: header_text,
        language: language,
        imageLink: img_link,
        headerImage: header_image,
        orderNumber: order_number,
        description,
        name
      };

      setPageConfig((prevPageConfig) => {
        return {
          ...prevPageConfig,
          ...pageConfigTemp
        };
      });
      handleAddModalOpen("Update Page Config");
    },
    [handleAddModalOpen]
  );

  const deletePageConfig = useCallback((row) => {
    const { id } = row.original;
    axiosPrivate
      .delete(`/api/protected/${currentConfig.pageConfig}/${id}`)
      .then(({ data }) => {
        console.log("data deleted  ", data.id);
      })
      .catch((err) => {
        console.error("error :>> ", err);
      });
  }, []);
  const pageConfigFormProps = useMemo(() => {
    return { pageConfig: _.cloneDeep(pageConfig), handleChange, errors: _.cloneDeep(errors) };
  }, [errors, handleChange, pageConfig]);
  const dialogFormProps = useMemo(() => {
    return {
      0: {
        dialogProps: { ...pageConfigFormProps, pageConfig: _.cloneDeep(pageConfig) },
        actionHandler: pageConfig.id ? updatePageConfig : savePageConfig,
        dialogHeader: pageDialogTitle,
        actionLabel: pageDialogTitle.startsWith("Add") ? "Add" : "Save"
      },
      1: { dialogProps: {}, actionHandler: () => {}, dialogHeader: " Add Content", actionLabel: "Add" },
      2: { dialogProps: {}, actionHandler: () => {}, dialogHeader: " Add Document", actionLabel: "Save" }
    };
  }, [pageConfigFormProps, pageConfig, updatePageConfig, savePageConfig, pageDialogTitle]);

  return {
    activeTab,
    handleTabChange,
    currentDialogFormProps: dialogFormProps[activeTab],
    labels,
    populatePageConfigForm,
    deletePageConfig,
    updatePageConfig,
    modalOpenAdd,
    handleAddModalClose,
    handleAddModalOpen,
    pageConfig
  };
};

export default useContentManager;
