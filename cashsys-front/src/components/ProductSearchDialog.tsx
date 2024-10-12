import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, TextField } from '@mui/material';
import React, { useState } from 'react';

interface ProductSearchDialogProps {
  open: boolean;
  onClose: () => void;
  products: { name: string; price: number; stock: number }[];
}

const ProductSearchDialog: React.FC<ProductSearchDialogProps> = ({ open, onClose, products }) => {
  const [query, setQuery] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Consultar Produto</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Buscar Produto"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <List>
          {filteredProducts.map((product, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${product.name} - R$ ${product.price.toFixed(2)}`}
                secondary={`Estoque: ${product.stock}`}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductSearchDialog;
