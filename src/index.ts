import app from './main';
import {
    PORT
} from './utils/config';

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});