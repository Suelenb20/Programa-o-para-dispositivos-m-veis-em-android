import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";

export default function App() {
  const [items, setItems] = useState([
    { id: "1", name: "Body de bebê", category: "Roupas", description: "Tamanho P, em bom estado." },
    { id: "2", name: "Carrinho de bebê", category: "Acessórios", description: "Modelo compacto, usado." },
  ]);

  const [newItem, setNewItem] = useState({ name: "", category: "", description: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.description) {
      setItems((prevItems) => [
        ...prevItems,
        { id: (items.length + 1).toString(), ...newItem },
      ]);
      setNewItem({ name: "", category: "", description: "" });
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Brechó Infantil</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar itens..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemCard}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCategory}>Categoria: {item.category}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.addItemSection}>
        <Text style={styles.sectionTitle}>Adicionar Novo Item</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do item"
          value={newItem.name}
          onChangeText={(text) => setNewItem({ ...newItem, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Categoria"
          value={newItem.category}
          onChangeText={(text) => setNewItem({ ...newItem, category: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={newItem.description}
          onChangeText={(text) => setNewItem({ ...newItem, description: text })}
        />
        <Button title="Adicionar Item" onPress={handleAddItem} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  itemCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemCategory: {
    fontSize: 14,
    color: "#888",
  },
  addItemSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});
