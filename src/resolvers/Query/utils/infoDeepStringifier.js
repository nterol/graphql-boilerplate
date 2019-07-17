const infoDeepStringifier = selectionSet => {

  return selectionSet.selections.map(selection => {
    const deepParams = selection.selectionSet
      ? infoDeepStringifier(selection.selectionSet)
      : false;
    return deepParams
      ? `${selection.name.value} { ${deepParams.join(" ")} }`
      : selection.name.value;
  });
};
export default infoDeepStringifier;
