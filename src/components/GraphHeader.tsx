import React from 'react';

interface GraphHeaderProps {
  chartType: string;
  handleChartTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePeriodChange: (period: string) => void;
  selectedPeriod: string;
}

export const GraphHeader: React.FC<GraphHeaderProps> = ({
  chartType,
  handleChartTypeChange,
  handlePeriodChange,
  selectedPeriod,
}) => {
  return (
    <div>
      {' '}
      <header className='d-flex justify-content-between align-items-center text-center'>
        <div className='d-flex align-items-center'>
          <h4 className='text-xl font-bold'>HISTORICAL DATA FOR ZONES</h4>

          <div className='px-4 rounded-lg outline-none '>
            <div className='dropdown'>
              <button
                className='btn bg-white dropdown-toggle rounded-pill'
                type='button'
                id='dropdownMenu2'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                {selectedPeriod}
              </button>
              <ul
                className='dropdown-menu dropdown-menu-dark '
                style={{ opacity: 0.7, borderRadius: '20px' }}
                aria-labelledby='dropdownMenu2'
              >
                <li>
                  <button
                    className='dropdown-item mt-2'
                    type='button'
                    onClick={() => handlePeriodChange('Last 4 Hours')}
                  >
                    Last 4 Hours
                  </button>
                </li>
                <li>
                  <button
                    className='dropdown-item mt-2'
                    type='button'
                    onClick={() => handlePeriodChange('Last 12 Hours')}
                  >
                    Last 12 Hours
                  </button>
                </li>
                <li>
                  <button
                    className='dropdown-item mt-2'
                    type='button'
                    onClick={() => handlePeriodChange('Last 24 Hours')}
                  >
                    Last 24 Hours
                  </button>
                </li>
                <li>
                  <button
                    className='dropdown-item mt-2'
                    type='button'
                    onClick={() => handlePeriodChange('Last 3 days')}
                  >
                    Last 3 days
                  </button>
                </li>
                <li>
                  <button
                    className='dropdown-item mt-2'
                    type='button'
                    onClick={() => handlePeriodChange('Last Week')}
                  >
                    Last Week
                  </button>
                </li>
                <li>
                  <button
                    className='dropdown-item mt-2'
                    type='button'
                    onClick={() => handlePeriodChange('Last 2 Week')}
                  >
                    Last 2 Week
                  </button>
                </li>
                <li>
                  <button
                    className='dropdown-item my-2'
                    type='button'
                    onClick={() => handlePeriodChange('1 month')}
                  >
                    1 month
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div role='radiogroup'>
              <input
                type='radio'
                id='ppm'
                name='chartType'
                value='ppm'
                className='form-check-input ms-4 me-2'
                checked={chartType === 'ppm'}
                onChange={handleChartTypeChange}
              />
              <label htmlFor='ppm' className='form-check-label me-4'>
                PPM
              </label>
              <input
                type='radio'
                id='temperature'
                name='chartType'
                value='temperature'
                className='form-check-input me-2'
                checked={chartType === 'temperature'}
                onChange={handleChartTypeChange}
              />
              <label htmlFor='temperature' className='form-check-label me-4'>
                TEMPERATURE
              </label>
              <input
                type='radio'
                id='humidity'
                name='chartType'
                value='humidity'
                className='form-check-input me-2'
                checked={chartType === 'humidity'}
                onChange={handleChartTypeChange}
              />
              <label htmlFor='humidity' className='form-check-label'>
                HUMIDITY
              </label>
            </div>
          </div>
        </div>
        <div>
          <button className='btn btn-dark border-radius-lg'>
            Download Report{' '}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-download ms-1
              '
              viewBox='0 0 16 16'
            >
              <path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5' />
              <path d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z' />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default GraphHeader;
