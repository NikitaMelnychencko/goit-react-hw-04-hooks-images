import PropTypes from 'prop-types';
import s from './Section.module.scss';

const Section = ({ children, color }) => {
  return (
    <section className={s.Section}>
      <div className={s.Container} style={{ backgroundColor: `${color}` }}>
        {children}
      </div>
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
};

export default Section;
